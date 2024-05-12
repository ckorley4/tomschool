#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db,Student,Venue,Course,Instructor,Enrollment

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Deleting students...")
        Student.query.delete()
        
        print("Deleting instructor...")
        Instructor.query.delete()
        
        print("Deleting venue...")
        Venue.query.delete()
        
        print("Deleting courses...")
        Course.query.delete()
       
        print("Creating Stundents")
        s1 = Student(program="Computer Science",year_of_birth=1984,name="Thomas",course=2)
        s2 = Student(program="Music",year_of_birth=1986,name="Nii Korley",course=1)
        s3 = Student(program="software Engineering",year_of_birth=1986,name="Bernard Korley",course=3)
        s4 = Student(program="Computer Science",year_of_birth=1993,name="Atu Skrilla",course=4)
        s5 = Student(program="Computer Science",year_of_birth=1993,name="Shatta Wale",course=5)
        s6 = Student(program="Data Science",year_of_birth=1984,name="Ama Corq",course=1)
        s7 = Student(program="Computer Science",year_of_birth=1984,name="Sarah Sarah",course=2)
        s8 = Student(program="Mathematics",year_of_birth=1991,name="Daria Neza",course=3)
        s9 = Student(program="Computer Science",year_of_birth=1987,name="Charle Nii Armah",course=4)
        s10 = Student(program="Mathematics",year_of_birth=1984,name="Odoole",course=5)
        s11 = Student(program="Data Science",year_of_birth=1994,name="Tinny Akquaye",course=1)
        s12 = Student(program="Computer Science",year_of_birth=1990,name="Shoto Emma",course=2)
        s13 = Student(program="Data Science",year_of_birth=1986,name="Scarf Row",course=3)
        s14 = Student(program="Mathematics",year_of_birth=1984,name="Klotia",course=4)
        s15 = Student(program="Computer Science",year_of_birth=1980,name="Philip",course=5)

        students=[s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15]
        db.session.add_all(students)
        db.session.commit()

        print("Creating Courses")
        c1 = Course(title="Introduction FrontEnd Web development",category="Software Development",image="https://i.ibb.co/r2zns1m/image-01.jpg",instructor_id=1,venue_id=2,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c2 = Course(title="Introdution BackEnd Development",category="Software Development",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYTIdCC3vsT8UcDNnFc-v3t6X2ZJGFGJPh480jbJxSw&s",instructor_id=2,venue_id=1,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c3 = Course(title="Introduction to Machine Learning",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVfLFyw_pQ3o9cqHGrJjbAAZq2Gmm8rqKCbHQeSeejAJ3rytYqSeURznhDYYIUJ5sFnBY&usqp=CAU",category="AI",instructor_id=3,venue_id=3,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c4 = Course(title="Introduction to Neural Networks",category="AI",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH6awLZc1bBLyitGywbEweHennMZzVq-cRXMBUPrKaLqRlx4cabTYyBxDD77I1utolIk0&usqp=CAU",instructor_id=4,venue_id=4,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c5 = Course(title="Systems thinking",category="Software Development",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxQoDsAI3XP6ovXQo8ncrHigxXUivsM2wiyDidYLfzA&s",instructor_id=1,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c6 = Course(title="Introduction to Databases",category="Databases",image="https://alg.manifoldapp.org/api/proxy/ingestion_sources/81d49cea-0b50-4e85-9f28-2698c9035a54",instructor_id=2,venue_id=4,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c10 = Course(title="The ultimate UX and UI guide to card design",category="Design",image="https://i.ibb.co/dL9fH7N/image-03-1.jpg",instructor_id=3,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c7 = Course(title="Advanced Databases",category="Databases",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPT-fq8FwhrYUjw8gXVflKuU3XusAH-uFZPQ_y02diQ&s",instructor_id=2,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c8 = Course(title="Amazon Web Services",category="DevOps",image="https://images.spiceworks.com/wp-content/uploads/2022/04/26162218/AWS.png",instructor_id=1,venue_id=4,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c9 = Course(title="Continuous Integration,Contonuos Deployment(CICD)",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKgM-DRqaQ3JBUl8zo-EtnQ7aC-hp_ZbRaOA1pAY0dQ&s",category="DevOps",instructor_id=3,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c11 = Course(title="Introduction FrontEnd Web development",category="Software Development",image="https://i.ibb.co/r2zns1m/image-01.jpg",instructor_id=1,venue_id=2,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c12 = Course(title="Introdution Calculus",category="Maths",image="https://i.ytimg.com/vi/EXG2Z1RpVwU/maxresdefault.jpg",instructor_id=2,venue_id=1,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c13 = Course(title="Introduction to Machine Learning",category="AI",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVfLFyw_pQ3o9cqHGrJjbAAZq2Gmm8rqKCbHQeSeejAJ3rytYqSeURznhDYYIUJ5sFnBY&usqp=CAU",instructor_id=3,venue_id=3,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c14 = Course(title="Introduction to Artificial Intelligence",category="AI",image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH6awLZc1bBLyitGywbEweHennMZzVq-cRXMBUPrKaLqRlx4cabTYyBxDD77I1utolIk0&usqp=CAU",instructor_id=4,venue_id=4,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c15 = Course(title="Data Structures and Algorithms",category="Software Development",image="https://i.ibb.co/dL9fH7N/image-03-1.jpg",instructor_id=1,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c16 = Course(title="Engineering Mathematics",category="Maths",image="https://www.magicmarks.in/wp-content/uploads/2021/11/Engineering-Mathematics-I.jpg",instructor_id=2,venue_id=4,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c20 = Course(title="Discrete Mathematics",category="Maths",image="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220504172515/Discrete-Mathematics-Tutorial.jpg",instructor_id=3,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c17 = Course(title="Introduction to Design Principles ",category="Desgn",image="https://miro.medium.com/v2/resize:fit:1400/1*_VwKD0Ropy0KahZdLbcscg.png",instructor_id=2,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c18 = Course(title="DevOps Engineering",category="DevOps",image="https://squareboat.com/storage/photos/22/What%20is%20DevOps.jpg",instructor_id=1,venue_id=4,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")
        c19 = Course(title="Convolution",category="Maths",image="https://www.dspguide.com/graphics/E_13_D.gif",instructor_id=3,venue_id=5,description="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit.")

            

        
        courses = [c1,c2,c3,c4,c5,c6,c7,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20]
        db.session.add_all(courses)
        db.session.commit()

        print("Creating Enrollments")
        e1 = Enrollment(student_id=1,course_id=2,user_id=1)
        e2 = Enrollment(student_id=2,course_id=1,user_id=4)
        e3 = Enrollment(student_id=2,course_id=1,user_id=1)
        e4 = Enrollment(student_id=14,course_id=4,user_id=4)
        e5 = Enrollment(student_id=12,course_id=1,user_id=1)
        e6 = Enrollment(student_id=11,course_id=5,user_id=4)
        e7 = Enrollment(student_id=2,course_id=3,user_id=1)
        e8 = Enrollment(student_id=3,course_id=3,user_id=4)
        e9 = Enrollment(student_id=3,course_id=1,user_id=4)
        e10 = Enrollment(student_id=9,course_id=4,user_id=1)
        e11 = Enrollment(student_id=2,course_id=3,user_id=1)
        e12 = Enrollment(student_id=14,course_id=5,user_id=4)
        e13 = Enrollment(student_id=1,course_id=1,user_id=4)
        e14 = Enrollment(student_id=1,course_id=1,user_id=2)
        e15 = Enrollment(student_id=2,course_id=5,user_id=1)
        e16 = Enrollment(student_id=5,course_id=1,user_id=2)
        e17 = Enrollment(student_id=3,course_id=5,user_id=2)
        e18 = Enrollment(student_id=9,course_id=1,user_id=2)
        e19 = Enrollment(student_id=2,course_id=1,user_id=4)
        e20 = Enrollment(student_id=14,course_id=1,user_id=4)
        e21 = Enrollment(student_id=8,course_id=1,user_id=2)
        e22 = Enrollment(student_id=11,course_id=1,user_id=3)
        e23 = Enrollment(student_id=8,course_id=5,user_id=4)
        e24 = Enrollment(student_id=3,course_id=2,user_id=4)
        e25 = Enrollment(student_id=3,course_id=2,user_id=3)
        e26 = Enrollment(student_id=9,course_id=5,user_id=2)
        e27 = Enrollment(student_id=2,course_id=1,user_id=1)
        e28 = Enrollment(student_id=15,course_id=1,user_id=1)
        e29 = Enrollment(student_id=12,course_id=5,user_id=3)
        e30 = Enrollment(student_id=5,course_id=1,user_id=4)
        e31 = Enrollment(student_id=2,course_id=5,user_id=1)
        e32 = Enrollment(student_id=7,course_id=1,user_id=3)
        e33 = Enrollment(student_id=3,course_id=5,user_id=1)
        e34 = Enrollment(student_id=9,course_id=2,user_id=1)
        enrollments = [e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15,e16,e17,e18,e19,e20,e21,e22,e23,e24,e25,e26,e27,e28,e29,e30,e33,e31,e32,e34]
        db.session.add_all(enrollments)
        db.session.commit()


        print("Creating Venues")
        v1 = Venue(location="Ga Mashie")
        v2 = Venue(location="Awoshie")
        v3 = Venue(location="Bukom")
        v4 = Venue(location="Ashongman")
        v5 = Venue(location="Kaneshie")
        venues = [v1, v2, v3,v4,v5]
        db.session.add_all(venues)
        db.session.commit()


        print("Creating Instructors")
        i1=Instructor(name="Lantz",specialty="back end",department="Computer Science")
        i2=Instructor(name="Bleshia",specialty="dance",department="Fine Art")
        i3=Instructor(name="Anima",specialty="Data",department="Computer Science")
        i4=Instructor(name="Akweley",specialty="Java",department="Computer Science")
        instructors= [i1, i2, i3,i4]
        db.session.add_all(instructors)
        db.session.commit()
