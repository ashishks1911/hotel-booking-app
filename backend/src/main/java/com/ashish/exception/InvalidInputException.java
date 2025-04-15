package com.ashish.exception;

public class InvalidInputException extends RuntimeException{

    public InvalidInputException(String messsage){
        super(messsage);
    }
    public InvalidInputException(){
        super("Invalid");
    }
}
