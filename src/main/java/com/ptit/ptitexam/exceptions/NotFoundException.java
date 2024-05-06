package com.ptit.ptitexam.exceptions;

public class NotFoundException extends RuntimeException {
    String resourceName;
    String FieldName;
    long FieldValue;
    String Value;

    public NotFoundException (String resourceName, String fieldName, long fieldValue) {
        super(String.format("%s not found with this %s : %s ", resourceName,fieldName, fieldValue));
        this.resourceName = resourceName;
        FieldName = fieldName;
        FieldValue = fieldValue;
    }

    public NotFoundException(String resourceName, String fieldName, String value) {
        super(String.format("%s not found with this %s : %s ", resourceName,fieldName, value));
        this.resourceName = resourceName;
        FieldName = fieldName;
        Value = value;
    }
}
