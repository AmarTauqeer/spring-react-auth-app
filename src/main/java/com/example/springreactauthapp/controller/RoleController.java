package com.example.springreactauthapp.controller;

import com.example.springreactauthapp.entity.Role;
import com.example.springreactauthapp.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/v1/role")
@RestController
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/")
    public String welcome(){
        return "hi from welcome page";
    }

    @PostMapping("/addRole")
    public Role addRole(@RequestBody Role role){
        return roleService.addRole(role);
    }
}
