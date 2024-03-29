package com.example.projects.studentsystem.repository;

import com.example.projects.studentsystem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Integer> {
}
