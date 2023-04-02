package com.example.springreactauthapp.service;

import com.example.springreactauthapp.dao.RoleDao;
import com.example.springreactauthapp.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleDao roleDao;

    public Role addRole(Role role){
        return roleDao.save(role);
    }
}
