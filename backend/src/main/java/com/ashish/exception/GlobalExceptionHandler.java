package com.ashish.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String,Object>> ResourceNotFoundExceptionHandler(ResourceNotFoundException ex){
        Map<String,Object> map = new HashMap<>();
        map.put("message",ex.getMessage());
        map.put("status", HttpStatus.NOT_FOUND);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
    }
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<Map<String,Object>> InvalidInputExceptionHandler(InvalidInputException ex){
        Map<String,Object> map = new HashMap<>();
        map.put("message",ex.getMessage());
        map.put("status", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(map);
    }
    @ExceptionHandler(DataIntegrityViolationException.class)
    public Map<String, String> handleValidationExceptions( DataIntegrityViolationException ex ) {
        Map<String,String> map= new HashMap<>();
        map.put("ERROR", ex.getMostSpecificCause().getMessage());
        return map;
    }

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<String> HttpClientErrorExceptionHandler(HttpClientErrorException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getResponseBodyAsString());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions( MethodArgumentNotValidException ex ) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> ExceptionHandler(Exception ex){
        System.out.println("Exception :"+ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }


}
