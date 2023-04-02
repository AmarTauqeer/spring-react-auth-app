package com.example.springreactauthapp.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Entity(name = "department_tbl")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Department {

    @Id
    @Column(name = "dept_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dept_id;

    @NonNull
    @Column(unique = true)
    private String name;

}