package com.example.springreactauthapp.entity;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Data
@Entity(name = "employee_tbl")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String phone;
    private String address;
    @NonNull
    @Column(unique=true)
    private String designation;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "dept_id")
    private Department department;

}
