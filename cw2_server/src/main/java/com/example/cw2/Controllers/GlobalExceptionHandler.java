package com.example.cw2.Controllers;
import com.example.cw2.DTOs.ErrorResponseDTO;
import com.example.cw2.Exceptions.InvalidBioIDException;
import com.example.cw2.Exceptions.InvalidCredentialsException;
import com.example.cw2.Exceptions.InvalidPasswordException;
import com.example.cw2.Exceptions.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponseDTO> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO();
        error.setStatus(HttpStatus.CONFLICT.value());
        error.setError("User Already Exists");
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseDTO> handleInvalidPassword(InvalidPasswordException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setError("Invalid Password");
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidBioIDException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseDTO> handleInvalidBioID(InvalidBioIDException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO();
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setError("Invalid Bio ID");
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ErrorResponseDTO> handleBadCredentials(InvalidCredentialsException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO();
        error.setStatus(HttpStatus.UNAUTHORIZED.value());
        error.setError("Invalid Credentials");
        error.setMessage("Invalid email or password");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}
