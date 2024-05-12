#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, make_response
from flask_restful import Resource,Api
from flask import Flask, make_response, jsonify,session,redirect,url_for
from authlib.integrations.flask_client import OAuth
import os
from flask_migrate import Migrate
import os
# Local imports
from config import app,db
from models import Venue,Student,Instructor,Course,Enrollment,Users,User
from werkzeug.security import generate_password_hash, check_password_hash

#b'\xd7\x1eYAO\xdbl[\x9d\xda\xb9h\x08\x9c\xd6\xd7'
# Add your model import
#app.secret_key=b'\xd7\x1eYAO\xdbl[\x9d\xda\xb9h\x08\x9c\xd6\xd7'

#Auth goes here

@app.route('/students', methods=['GET'])
def index():
    student_list =[student.to_dict() for student in Student.query.all()]
    return make_response(student_list,200)

@app.route('/students/<int:id>', methods =['GET','PATCH','DELETE'])
def student_by_id(id):
    student = Student.query.filter(Student.id == id).first()
    if student:
        if request.method == 'DELETE':
            db.session.delete(student)
            db.session.commit()
            return make_response(student.to_dict(),202)
        elif request.method == 'GET':
            return make_response(student.to_dict(rules=("-enrollments",)),200)
        elif request.method == 'PATCH':
            try:
                incoming = request.get_json()
                for attr in incoming:
                    setattr(student,attr,incoming[attr])
                    db.session.commit()
                return make_response(student.to_dict(),201)
            except:
                return make_response({"errors": ["validation errors"]},400)
        else:
            return make_response({"error": "Student not Found"},404)
        
@app.route('/enrollments/<int:id>', methods =['GET','POST','PATCH','DELETE'])
def enrollment_by_id(id):
    enrollment = Enrollment.query.filter(Enrollment.user_id == id)
    if enrollment:
        if request.method == 'DELETE':
            db.session.delete(enrollment)
            db.session.commit()
            return make_response(enrollment.to_dict(),202)
        elif request.method == 'GET':
            return make_response(enrollment.to_dict(),200)
        elif request.method == 'PATCH':
            try:
                incoming = request.get_json()
                for attr in incoming:
                    setattr(enrollment,attr,incoming[attr])
                    db.session.commit()
                return make_response(enrollment.to_dict(),201)
            except:
                return make_response({"errors": ["validation errors"]},400)
        else:
            return make_response({"error": "Student not Found"},404)
        


@app.route('/courses/<int:id>', methods =['GET','PATCH','DELETE'])
def course_by_id(id):
    enrollment = Course.query.filter(Course.id == id).first()
    if enrollment:
        if request.method == 'DELETE':
            db.session.delete(enrollment)
            db.session.commit()
            return make_response(enrollment.to_dict(),202)
        elif request.method == 'GET':
            return make_response(enrollment.to_dict(rules=("-enrollments",)),200)
        elif request.method == 'PATCH':
            try:
                incoming = request.get_json()
                for attr in incoming:
                    setattr(enrollment,attr,incoming[attr])
                    db.session.commit()
                return make_response(enrollment.to_dict(),201)
            except:
                return make_response({"errors": ["validation errors"]},400)
            
        else:
            return make_response({"error": "Student not Found"},404)
@app.route('/students',methods =['POST'])
def new():
     try:
        incoming = request.get_json()
        new_student = Student(**incoming)
        db.session.add(new_student)
        db.session.commit()
        return make_response(new_student.to_dict,201)
     except:
        return make_response({"errors": ["Nii"]},400)
     else:
         return make_response({"error": "Student not Found"},404)
   

@app.route('/venues', methods=['GET'])
def venues():
    venue_list =[venue.to_dict() for venue in Venue.query.all()]
    return make_response(venue_list,200)

@app.route('/instructors', methods=['GET'])
def instructors():
    instructor_list =[instructor.to_dict() for instructor in Instructor.query.all()]
    return make_response(instructor_list,200)


@app.route('/courses', methods=['GET'])
def courses():
    email = dict(session).get('email',None)
    course_list =[course.to_dict() for course in Course.query.all()]
    return make_response(course_list,200)

@app.route('/enrollments', methods=['GET','POST'])
def enrollments():
     if request.method == "GET":
        enrollment_list =[enrollment.to_dict() for enrollment in Enrollment.query.all()]
        return make_response(enrollment_list,200)
     elif request.method == "POST":
        try:
            incoming = request.get_json()
            new_enrollment = Enrollment(**incoming)
            db.session.add(new_enrollment)
            db.session.commit()
            return make_response(new_enrollment.to_dict,201)
        except:
            return make_response({"errors": ["Nii"]},400)
  
    
   
@app.route('/users', methods=['POST'])
def register_user():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    # Check if user already exists
    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User with this email already exists'}), 400

    # Hash the password
    password_hash = generate_password_hash(password)

    # Create and add new user to database
    new_user = Users(email=email, username=username, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    # Return user_id and username along with success message
    return jsonify({
        'message': 'User registered successfully',
        'user_id': new_user.id,
        'username': new_user.username
    }), 201

# Log in an existing user
@app.route('/users', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = Users.query.filter_by(email=email).first()

    if user and check_password_hash(user.password_hash, password):
        # Include user_id and username in the successful login response as a single JSON object
        return jsonify({
            'message': 'Login successful',
            'user_id': user.id,
            'username': user.username  # This now correctly adds the username to the response
        }), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
    


@app.route('/authorize')
def authorize():
  
    return redirect('/courses')

@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')

@app.route('/signup',methods=['POST'])
def signup():
    user=request.json
    newUser =User(**user)
    db.session.add(newUser)
    db.session.commit()
    session['name']=newUser.id
    return make_response(newUser.to_dict(),200)

@app.route('/login',methods=['POST'])
def login():
    user=User.query.filter_by(uname=request.json()['uname']).first()
    session['name']=user.id
    return make_response({},200)


if __name__ == '__main__':
    app.run(port=5555, debug=True)

