package com.fci.cu.houseek.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "userName", nullable = false)
    private String userName;


    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "isRead", nullable = false, columnDefinition = "VARCHAR(8) DEFAULT 'false'")
    private Boolean isRead;

}
