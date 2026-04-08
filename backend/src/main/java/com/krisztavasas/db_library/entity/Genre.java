package com.krisztavasas.db_library.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Műfaj entitás.
 * <p>
 * Reprezentálja a könyvek műfajait.
 * Egy könyvhöz több műfaj is tartozhat (many-to-many kapcsolat).
 */
@Entity
@Table(name = "genres")
@Getter
@Setter
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "external_id", unique = true, nullable = true, updatable = false)
    private Long externalId;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToMany(mappedBy = "genres")
    private Set<Book> books = new HashSet<>();
}
