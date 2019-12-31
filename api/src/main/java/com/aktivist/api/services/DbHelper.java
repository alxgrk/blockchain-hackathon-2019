package com.aktivist.api.services;


import com.aktivist.api.models.User;
import com.aktivist.api.models.UserRepository;
import com.aktivist.api.models.Verein;
import com.aktivist.api.models.VereinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DbHelper {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VereinRepository vereinRepository;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(long id) {
        return userRepository.findById(id).get();
    }

    public Iterable<Verein> getAllVereine() {
        return vereinRepository.findAll();
    }

    public Verein getVereinById(long id) {
        return vereinRepository.findById(id).get();
    }

}
