package webalk.assignment.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Dvd {
    //mark id as primary key
    @Id
    @GeneratedValue
    private Long id;
    private String fname;
    private String genre;
    private String director;
    private String agerating;
    private String playtime;

}