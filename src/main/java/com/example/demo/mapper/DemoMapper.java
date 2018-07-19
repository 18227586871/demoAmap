package com.example.demo.mapper;

import com.example.demo.entity.Demo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Mapper
public interface DemoMapper {

    @Select("SELECT * FROM demo WHERE id = #{id}")
    Demo findById(Integer id);

    @Select("SELECT * FROM demo")
    List<Demo> demoList();

    void save(Demo demo);

    @Delete("DELETE FROM demo WHERE id = #{id}")
    void delete(Integer id);
}
