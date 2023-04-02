package com.example.springreactauthapp.service;

import com.example.springreactauthapp.dao.RoleDao;
import com.example.springreactauthapp.dao.UserDao;
import com.example.springreactauthapp.entity.Role;
import com.example.springreactauthapp.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRolesAndUser(){
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("default role for newly created record.");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin");
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setEmail("amar.tauqeer@gmail.com");
        adminUser.setUserPassword(encodedPassword("admin@pass"));
        Set<Role> adminRoles= new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

//        User user = new User();
//        user.setUserName("amar123");
//        user.setUserFirstName("amar");
//        user.setUserLastName("tauqeer");
//        user.setUserPassword(encodedPassword("amar@pass"));
//        Set<Role> userRoles= new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        userDao.save(user);
    }

    public String encodedPassword(String password){
        return passwordEncoder.encode(password);
    }
    public User addUser(User user){
        Role role = roleDao.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);

        user.setUserPassword(encodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }

    public String deleteUserById(String name){
        userDao.deleteById(name);
        return "User with name " + name + " has been deleted successfully.";
    }

    public User updateUser(@RequestBody User newUser, String name) {
        return userDao.findById(name)
                .map(user -> {
                    user.setEmail(newUser.getEmail());
                    user.setUserName(newUser.getUserName());
                    user.setUserFirstName(newUser.getUserFirstName());
                    user.setUserLastName(newUser.getUserLastName());
//                    user.setUserPassword(encodedPassword(newUser.getUserPassword()));
                    return userDao.save(user);
                }).orElse(null);
    }

    public List<User> getUsers() {
        return userDao.findAll();
    }
    public User getUserById(String name) {
        return userDao.findById(name).orElse(null);
    }
}
