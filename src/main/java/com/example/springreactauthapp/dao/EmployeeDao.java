package com.example.springreactauthapp.dao;

import com.example.springreactauthapp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDao extends JpaRepository<Employee, Integer> {
}
