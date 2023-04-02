package com.example.springreactauthapp.service;

import com.example.springreactauthapp.dao.EmployeeDao;
import com.example.springreactauthapp.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeDao employeeDao;

    public Employee addEmployee(@RequestBody Employee employee){
        return employeeDao.save(employee);
    }

    public Employee getEmployeeById(int id){
        return employeeDao.findById(id).orElse(null);
    }

    public List<Employee> getEmployees(){
        return employeeDao.findAll();
    }

    public Employee updateEmployee(@RequestBody Employee newEmployee, int id){
        return employeeDao.findById(id)
                .map(employee -> {
                    employee.setName(newEmployee.getName());
                    employee.setEmail(newEmployee.getEmail());
                    employee.setAddress(newEmployee.getAddress());
                    employee.setPhone(newEmployee.getPhone());
                    employee.setDepartment(newEmployee.getDepartment());
                    employee.setDesignation(newEmployee.getDesignation());
                    return employeeDao.save(employee);
                }).orElse(null);
    }

    public String deleteEmployeeById(int id) {
        employeeDao.deleteById(id);
        return "Employee with id "+id+" has been deleted successfully.";
    }
}
