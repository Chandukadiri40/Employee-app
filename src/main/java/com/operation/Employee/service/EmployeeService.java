package com.operation.Employee.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.operation.Employee.Entity.Employee;
import com.operation.Employee.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
	
    @Autowired
    private EmployeeRepository employeeRepository;
    
    public Employee postEmployee(Employee employee) {
    	return employeeRepository.save(employee);
    	
    	
    }
    public List<Employee> getAllEmployees(){
    	return employeeRepository.findAll();
    }
    public void deleteEmployee(Long id) {
    	if(!employeeRepository.existsById(id)) {
    		throw new EntityNotFoundException("Employee with id"+id+"not found");
    	}
    	employeeRepository.deleteById(id);
    }
    public Employee getEmployeeById(Long Id) {
    	return employeeRepository.findById(Id).orElse(null);
    }
    public Employee updateEmployee(Long id,Employee employee) {
    	java.util.Optional<Employee>optionalEmployee=employeeRepository.findById(id);
    	if(optionalEmployee.isPresent()) {
    		Employee existingEmployee=optionalEmployee.get();
    		existingEmployee.setName(employee.getName());
    		existingEmployee.setEmail(employee.getEmail());
    		existingEmployee.setPhone(employee.getPhone());
    		existingEmployee.setDepartment(employee.getDepartment());

    		return employeeRepository.save(existingEmployee);
    	}
    	return null;
    	
    }
    
}
