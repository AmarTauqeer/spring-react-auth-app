package com.example.springreactauthapp.controller;

import com.example.springreactauthapp.entity.Department;
import com.example.springreactauthapp.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/department")
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class DepartmentController {
    private final DepartmentService departmentService;

    @PostMapping("/add-department")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public Department addDepartment(@RequestBody Department department){
        return departmentService.addDepartment(department);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public Department getDepartmentById(@PathVariable("id") int id){
        return departmentService.getDepartmentById(id);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('Admin','User')")
    public List<Department> getDepartments(){
        return departmentService.getDepartments();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    Department updateDepartment(@RequestBody Department newDepartment ,@PathVariable("id") int id){
        return departmentService.updateDepartment(newDepartment,id);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public String deleteDepartmentById(@PathVariable("id") int id){
        return departmentService.deleteDepartmentById(id);
    }
}
