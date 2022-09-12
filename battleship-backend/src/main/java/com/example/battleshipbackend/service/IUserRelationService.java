package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.UserRelation;

import java.util.List;

/**
 * Interfejs implementowany przez klasę UserRelationService
 */
public interface IUserRelationService {

    List<UserRelation> checkIfRelationExists(Long id1, Long id2);
    void deleteRelation(Long id1, Long id2);
    UserRelation addRelation(UserRelation userRelation);
}
