package com.example.springreactauthapp.service;

import com.example.springreactauthapp.dao.DepartmentDao;
import com.example.springreactauthapp.entity.Department;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentDao departmentDao;

    public Department addDepartment(@RequestBody Department department){
        return departmentDao.save(department);
    }

    public Department getDepartmentById(int id){
        return departmentDao.findById(id).orElse(null);
    }

    public List<Department> getDepartments(){
        return departmentDao.findAll();
    }

    public Department updateDepartment(@RequestBody Department newDepartment, int id){
        return departmentDao.findById(id)
                .map(department -> {
                    department.setName(newDepartment.getName());
                    return departmentDao.save(department);
                }).orElse(null);
    }

    public String deleteDepartmentById(int id) {
        departmentDao.deleteById(id);
        return "Department with id "+id+" has been deleted successfully.";
    }
}
