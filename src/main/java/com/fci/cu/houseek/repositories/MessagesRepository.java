package com.fci.cu.houseek.repositories;

import com.fci.cu.houseek.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MessagesRepository extends JpaRepository<Message,Long> {

    //@Query("SELECT u FROM Message u WHERE u.userName= :userName")
    //List<Message> allMessages(@Param("userName")String userName);
    @Query("SELECT m FROM Message m WHERE m.userName" +
            "= :u")
    List<Message> allMessages(@Param("u")String u);

    @Query("SELECT m FROM Message m WHERE m.id" +
            "= :id")
    Message getMessageById(@Param("id")long id);

    @Transactional
    @Modifying
    @Query("UPDATE Message m SET m.isRead = true WHERE m.userName = :userName")
    int updateMessageByUser(@Param("userName") String userName);
}
