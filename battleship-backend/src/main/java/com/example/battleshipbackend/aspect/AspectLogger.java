package com.example.battleshipbackend.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class AspectLogger {

    @Before("execution(* com.example.battleshipbackend.controller.AuthController.login(..))")
    public void logBeforeLogin(JoinPoint joinPoint) {
        System.out.println("\n *** Advice Before - (logBeforeLogin)\n *** Method : " + joinPoint.getSignature().getName() + "(), Args : " + Arrays.toString(joinPoint.getArgs()));
    }

    @Pointcut("execution(* com.example.battleshipbackend.controller.AuthController.login(..))")
    private void login() {
    }

    @AfterReturning(pointcut = "login()", returning = "retVal")
    public void afterReturningLogin(JoinPoint joinPoint, Object retVal) {
        System.out.println("\n *** Advice AfterReturning - (afterReturningLogin)\n *** Method : " + joinPoint.getSignature().getName() + "(), Returned value : " + retVal.toString());
    }

    @Around("execution(* com.example.battleshipbackend.controller.AuthController.login(..))")
    public Object beforeLogin(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("\n *** Advice Around - (beforeLogin)");

        Object[] args = proceedingJoinPoint.getArgs();
        if (args.length > 0) {
            System.out.print(" *** Arguments matched : " );
            for (int i = 0; i < args.length; i++) {
                System.out.print("arg " + (i + 1) + " : " + args[i].toString());
            }
        }

        System.out.println();

        ResponseEntity<String> result = (ResponseEntity<String>)proceedingJoinPoint.proceed();

        System.out.println("\n *** Advice Around - (beforeLogin)");
        System.out.println(" *** Returned value : " + result);

        return result;
    }
}
