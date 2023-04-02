package com.example.springreactauthapp.controller;

import com.example.springreactauthapp.entity.User;
import com.example.springreactauthapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@RequestMapping("api/v1/user")
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    @PostConstruct
    public void initRolesAndUsers(){
        userService.initRolesAndUser();
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('Admin','User')")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user){

        return userService.addUser(user);
    }

    @GetMapping("/{name}")
    @PreAuthorize("hasRole('Admin')")
    public User getUserById(@PathVariable String name){
        return userService.getUserById(name);
    }

    @DeleteMapping("/delete/{name}")
    @PreAuthorize("hasRole('Admin')")
    public String deleteUser(@PathVariable String name){
        return userService.deleteUserById(name);
    }

    @PutMapping("/update/{name}")
    @PreAuthorize("hasRole('Admin')")
    User updateUser(@RequestBody User newUser, @PathVariable("name") String name) {
        return userService.updateUser(newUser, name);
    }

    @GetMapping("/forAdmin")
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to admin.";
    }


    @GetMapping("/forUser")
    @PreAuthorize("hasRole('User')")
//    @PreAuthorize("hasAnyRole('User','Admin')") for multiple roles
    public String forUser(){
        return "This URL is only accessible to user.";
    }

}
