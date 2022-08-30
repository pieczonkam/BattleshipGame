package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.UserRelation;
import com.example.battleshipbackend.repository.UserRelationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRelationService implements IUserRelationService {

    @Autowired
    private UserRelationRepository userRelationRepository;

    @Override
    public List<UserRelation> checkIfRelationExists(Long id1, Long id2) {
        return userRelationRepository.checkIfRelationExists(id1, id2);
    }

    @Override
    public void deleteRelation(Long id1, Long id2) {
        userRelationRepository.deleteRelation(id1, id2);
    }

    @Override
    public UserRelation addRelation(UserRelation userRelation) {
        return userRelationRepository.save(userRelation);
    }
}
