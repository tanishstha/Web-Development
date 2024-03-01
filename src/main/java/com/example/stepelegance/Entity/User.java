package com.example.stepelegance.Entity;

import com.example.stepelegance.Entity.UserDefinedDataEnums.Gender;
import com.example.stepelegance.Entity.UserDefinedDataEnums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users", uniqueConstraints = {
        @UniqueConstraint(name="UNIQUE_user_email", columnNames = "email"),
        @UniqueConstraint(name = "UNIQUE_user_phone", columnNames = "phone"),
        @UniqueConstraint(name = "UNIQUE_user_token", columnNames = "token")
})
public class User implements UserDetails {

    @Id
    @SequenceGenerator(name = "users_seq_gen", sequenceName = "users_id_seq", allocationSize = 1, initialValue = 1400)
    @GeneratedValue(generator = "users_seq_gen", strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name="last_name", nullable = false)
    private String lastName;

    @Size(min = 9)
    @Column(name="phone", nullable = false, unique = true)
    private String phone;

    @Email
    @Column(name="email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;


    @Column(name="token", nullable = false, unique = true)
    private String token;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
