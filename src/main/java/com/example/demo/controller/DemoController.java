package com.example.demo.controller;


import com.example.demo.entity.Demo;
import com.example.demo.service.DemoService;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class DemoController {

    @Autowired
    DemoService demoService;

    @GetMapping("/one/{id}")
    public Demo getOne(@PathVariable("id")Integer id){
        System.out.println(id);
        return demoService.getOne(id);
    }

    @GetMapping("/list")
    public List<Demo> demoList(){
        return demoService.demoList();
    }

    @PostMapping("/save")
    public void save(@RequestBody Demo demo){
        demoService.save(demo);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id")Integer id){
        System.out.println("IDIDID：" + id);
        demoService.delete(id);
    }
}
