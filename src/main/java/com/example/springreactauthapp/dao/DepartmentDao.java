package com.example.springreactauthapp.dao;

import com.example.springreactauthapp.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentDao extends JpaRepository<Department, Integer> {
}
