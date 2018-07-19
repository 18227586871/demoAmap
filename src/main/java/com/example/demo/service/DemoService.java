package com.example.demo.service;

import com.example.demo.entity.Demo;
import com.example.demo.mapper.DemoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DemoService {

    @Autowired
    DemoMapper demoMapper;

    public Demo getOne(Integer id){
        return demoMapper.findById(id);
    }

    public List<Demo> demoList(){
        return demoMapper.demoList();
    }

    public void save(Demo demo){
        demoMapper.save(demo);
    }

    public void delete(Integer id){
        demoMapper.delete(id);
    }
}
