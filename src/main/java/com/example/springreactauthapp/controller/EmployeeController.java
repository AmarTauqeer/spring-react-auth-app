package com.example.springreactauthapp.controller;

import com.example.springreactauthapp.entity.Employee;
import com.example.springreactauthapp.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/employee")
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping("/add-employee")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public Employee addEmployee(@RequestBody Employee employee){
        System.out.println(employee);
        return employeeService.addEmployee(employee);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public Employee getEmployeeById(@PathVariable("id") int id){
        return employeeService.getEmployeeById(id);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('Admin','User')")
    public List<Employee> getEmployees(){
        return employeeService.getEmployees();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    Employee updateEmployee(@RequestBody Employee newEmployee ,@PathVariable("id") int id){
        return employeeService.updateEmployee(newEmployee,id);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public String deleteEmployeeById(@PathVariable("id") int id){
        return employeeService.deleteEmployeeById(id);
    }
}
