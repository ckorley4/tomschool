#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Student, Venue, Course, Instructor, Enrollment

if __name__ == '__main__':
    fake = Faker()
    
    with app.app_context():
        print("Starting seed...")
        
        # Deleting existing data
        print("Deleting students...")
        Student.query.delete()
        
        print("Deleting instructors...")
        Instructor.query.delete()
        
        print("Deleting venues...")
        Venue.query.delete()
        
        print("Deleting courses...")
        Course.query.delete()
        
        print("Deleting enrollments...")
        Enrollment.query.delete()
        
        # Creating Students
        print("Creating Students")
        students = []
        for i in range(1, 16):
            student = Student(
                program=fake.job(),
                year_of_birth=fake.year(),
                name=fake.name(),
                course=randint(1, 5)
            )
            students.append(student)
        
        db.session.add_all(students)
        db.session.commit()

        # Creating Venues
        print("Creating Venues")
        venues = []
        for location in ["Ga Mashie", "Awoshie", "Bukom", "Ashongman", "Kaneshie"]:
            venue = Venue(location=location)
            venues.append(venue)
        
        db.session.add_all(venues)
        db.session.commit()
        
        # Creating Instructors
        print("Creating Instructors")
        instructors = []
        for i in range(1, 5):
            instructor = Instructor(
                name=fake.name(),
                specialty=fake.job(),
                department=fake.company()
            )
            instructors.append(instructor)
        
        db.session.add_all(instructors)
        db.session.commit()
        
        # Creating Courses with tech-related names, images, and descriptions
        print("Creating Courses")
        tech_images = [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQG30WqshNW1e9qJX1lgL4or4Zn1lGpfRMsA&s"

            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcLQqP4j5oTee7SaZ1j9nZ103BLnZG9KTk6Q&s"
            "https://example.com/tech_image2.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnzZ__J_zkRMmNv0kO8I1Tu3Y1Bk6PphSVxQ&s"
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdBnCwEWNjYw3_IqBSG59kB-SqZxDV4G7_AQ&s"
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwWPGhCN2YY2wu9tCtYe5fhKe7XcJSrWqbA&s"
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS35HQfx6CQ8OinnrRCoV_nkmwwcL_uXscz6g&s"
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREooNbIgw1hJQa-Ah6e6PX6zWB1kIYNbXtyA&s",
            # Add more tech-related image URLs here
        ]
        
        course_titles = [
            "Introduction to Python Programming",
            "Advanced JavaScript",
            "Machine Learning with Python",
            "Data Structures and Algorithms",
            "Introduction to Cloud Computing",
            "Full-Stack Web Development",
            "DevOps Essentials",
            "Cyber Security Basics",
            "Mobile App Development",
            "Artificial Intelligence",
            # Add more course titles here
        ]

        courses = []
        for _ in range(30):
            course = Course(
                title=rc(course_titles),
                category="Technology",
                image=rc(tech_images),
                #instructor_id=randint(1, 4),
                #venue_id=randint(1, 5),
                description=fake.paragraph(nb_sentences=3)
            )
            courses.append(course)
        
        db.session.add_all(courses)
        db.session.commit()

        # Creating Enrollments
        print("Creating Enrollments")
        enrollments = []
        for _ in range(50):  # assuming 50 enrollments for example
            enrollment = Enrollment(
                student_id=randint(1, 15),
                course_id=randint(1, 40),
                user_id=randint(1, 4)  # assuming 4 users
            )
            enrollments.append(enrollment)
        
        db.session.add_all(enrollments)
        db.session.commit()

        print("Seeding completed!")
