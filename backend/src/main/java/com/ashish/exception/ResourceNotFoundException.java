package com.ashish.exception;

public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String messsage){
        super(messsage);
    }
    public ResourceNotFoundException(){
        super("Resource Not Found");
    }
}
