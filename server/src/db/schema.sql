CREATE DATABASE todolist default CHARACTER SET UTF8;

-- 투두리스트_기본
create table `todo`
(
    `id`           int          not null auto_increment primary key,  -- 투두리스트 index
    `text`        varchar(1024),                                      -- 내용
    `done`     tinyint      not null default 0                    -- 완료 여부
);
