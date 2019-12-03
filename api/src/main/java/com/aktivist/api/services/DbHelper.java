package com.aktivist.api.services;


import com.aktivist.api.models.User;
import com.aktivist.api.models.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbHelper {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(long id) {

        return userRepository.findById(id).get();
    }


}
