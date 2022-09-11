package com.example.battleshipbackend.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@ComponentScan("com.example.battleshipbackend")
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class AspectJConfig {
}
