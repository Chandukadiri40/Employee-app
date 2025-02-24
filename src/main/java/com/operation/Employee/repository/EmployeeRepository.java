package com.operation.Employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.operation.Employee.Entity.Employee;



//By extending JpaRepository, it inherits basic CRUD operations and query methods for the Employee entity.
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Additional custom queries can go here if needed.
}
