package com.example.battleshipbackend.service;

import com.example.battleshipbackend.model.UserRelation;
import com.example.battleshipbackend.repository.UserRelationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Klasa reprezentująca serwis odpowiedzialny za zapytania do bazy danych związane z relacjami
 */
@Service
public class UserRelationService implements IUserRelationService {

    /**
     * Obiekt UserRelationRepository
     */
    @Autowired
    private UserRelationRepository userRelationRepository;

    /**
     * Metoda zwracająca listę relacji pomiędzy dwoma użytkownikami
     * @param id1 ID pierwszego użytkownika
     * @param id2 ID drugiego użytkownika
     * @return lista relacji
     */
    @Override
    public List<UserRelation> checkIfRelationExists(Long id1, Long id2) {
        return userRelationRepository.checkIfRelationExists(id1, id2);
    }

    /**
     * Metoda usuwająca relację z bazy danych
     * @param id1 ID pierwszego użytkownika
     * @param id2 ID drugiego użytkownika
     */
    @Override
    public void deleteRelation(Long id1, Long id2) {
        userRelationRepository.deleteRelation(id1, id2);
    }

    /**
     * Metoda dodająca nową relację do bazy danych
     * @param userRelation dane relacji
     * @return dodana relacja
     */
    @Override
    public UserRelation addRelation(UserRelation userRelation) {
        return userRelationRepository.save(userRelation);
    }
}
