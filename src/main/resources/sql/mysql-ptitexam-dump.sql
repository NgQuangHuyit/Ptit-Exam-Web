-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: ptitexam
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
                         `id` bigint NOT NULL AUTO_INCREMENT,
                         `last_login_time` datetime(6) DEFAULT NULL,
                         `name` varchar(70) DEFAULT NULL,
                         `password` varchar(255) NOT NULL,
                         `username` varchar(255) NOT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `UK_gfn44sntic2k93auag97juyij` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'2024-04-22 17:09:33.000000','Admin','admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `is_correct` bit(1) DEFAULT NULL,
                          `selected_choice` enum('A','B','C','D') DEFAULT NULL,
                          `result_id` bigint DEFAULT NULL,
                          `question_id` bigint DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FKo6bw4uhditi424e3ov3eh9p8i` (`result_id`),
                          KEY `FK8frr4bcabmmeyyu60qt7iiblo` (`question_id`),
                          CONSTRAINT `FK8frr4bcabmmeyyu60qt7iiblo` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
                          CONSTRAINT `FKo6bw4uhditi424e3ov3eh9p8i` FOREIGN KEY (`result_id`) REFERENCES `exam_result` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,_binary '','A',1,1),(2,_binary '\0','A',1,2),(3,_binary '\0','A',1,3),(4,_binary '\0','A',1,4),(5,_binary '\0','B',2,1),(6,_binary '','B',2,2),(7,_binary '\0','B',2,3),(8,_binary '\0','B',2,4);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_publication`
--

DROP TABLE IF EXISTS `event_publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_publication` (
                                     `id` binary(16) NOT NULL,
                                     `completion_date` datetime(6) DEFAULT NULL,
                                     `event_type` varchar(255) DEFAULT NULL,
                                     `listener_id` varchar(255) DEFAULT NULL,
                                     `publication_date` datetime(6) DEFAULT NULL,
                                     `serialized_event` varchar(255) DEFAULT NULL,
                                     PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_publication`
--

LOCK TABLES `event_publication` WRITE;
/*!40000 ALTER TABLE `event_publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
                        `id` bigint NOT NULL AUTO_INCREMENT,
                        `created_at` datetime(6) DEFAULT NULL,
                        `description` varchar(255) DEFAULT NULL,
                        `is_active` bit(1) DEFAULT NULL,
                        `question_count` int DEFAULT NULL,
                        `subject` varchar(255) DEFAULT NULL,
                        `time_amt` int DEFAULT NULL,
                        `title` varchar(255) NOT NULL,
                        `updated_at` datetime(6) DEFAULT NULL,
                        `created_by` bigint DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        KEY `FKsf6m94d2sbkxsyen7298thu3h` (`created_by`),
                        CONSTRAINT `FKsf6m94d2sbkxsyen7298thu3h` FOREIGN KEY (`created_by`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (1,'2024-04-22 17:11:00.000000','Thi giua ki I nam 2023 mon Mang may tinh',_binary '',0,'Mang may tinh',50,'MMT-GKI-2022','2024-04-22 17:12:21.000000',1),(2,'2024-04-22 17:12:36.000000','Thi cuoi ki II nam 2024 mon Co so du lieu',_binary '',0,'Co so du lieu',50,'CSDL-CKII-2024','2024-04-22 17:13:31.000000',1),(3,'2024-04-22 17:13:45.000000','Thi cuoi ki I nam 2021 mon Lap trinh web',_binary '',0,'Lap trinh web',50,'LTW-CKI-2021','2024-04-22 17:14:56.000000',1);
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_result`
--

DROP TABLE IF EXISTS `exam_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_result` (
                               `id` bigint NOT NULL AUTO_INCREMENT,
                               `end_time` datetime(6) DEFAULT NULL,
                               `point` float DEFAULT NULL,
                               `start_time` datetime(6) DEFAULT NULL,
                               `exam_id` bigint NOT NULL,
                               `user_id` bigint NOT NULL,
                               PRIMARY KEY (`id`),
                               KEY `FKmblvyjlk9x7rrm7mvqtbedycc` (`exam_id`),
                               KEY `FK9l2eacpio7fo7sa8wy4clxf1r` (`user_id`),
                               CONSTRAINT `FK9l2eacpio7fo7sa8wy4clxf1r` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
                               CONSTRAINT `FKmblvyjlk9x7rrm7mvqtbedycc` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_result`
--

LOCK TABLES `exam_result` WRITE;
/*!40000 ALTER TABLE `exam_result` DISABLE KEYS */;
INSERT INTO `exam_result` VALUES (1,'2024-04-22 17:23:51.658000',2.5,'2024-04-22 17:20:18.872000',1,1),(2,'2024-04-22 17:24:05.767000',2.5,'2024-04-22 17:22:16.460000',1,2);
/*!40000 ALTER TABLE `exam_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
                            `id` bigint NOT NULL AUTO_INCREMENT,
                            `choicea` varchar(300) DEFAULT NULL,
                            `choiceb` varchar(300) DEFAULT NULL,
                            `choicec` varchar(300) DEFAULT NULL,
                            `choiced` varchar(300) DEFAULT NULL,
                            `content` varchar(300) DEFAULT NULL,
                            `last_modified` datetime(6) DEFAULT NULL,
                            `right_choice` enum('A','B','C','D') DEFAULT NULL,
                            `exam_id` bigint NOT NULL,
                            PRIMARY KEY (`id`),
                            KEY `FKhupso6ldavcx993tfnrjsdl1p` (`exam_id`),
                            CONSTRAINT `FKhupso6ldavcx993tfnrjsdl1p` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Dap an A','Dap an B','Dap an C','Dap an D','Chon dap an dung','2024-04-22 17:15:59.000000','A',1),(2,'Dap an A','Dap an B','Dap an C','Dap an D','Chon dap an dung','2024-04-22 17:16:32.000000','B',1),(3,'Dap an A','Dap an B','Dap an C','Dap an D','Chon dap an dung','2024-04-22 17:16:54.000000','C',1),(4,'Dap an A','Dap an B','Dap an C','Dap an D','Chon dap an dung','2024-04-22 17:17:35.000000','D',1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
                        `id` bigint NOT NULL AUTO_INCREMENT,
                        `classid` varchar(20) DEFAULT NULL,
                        `created_at` datetime(6) DEFAULT NULL,
                        `dob` date DEFAULT NULL,
                        `email` varchar(255) NOT NULL,
                        `fullname` varchar(255) DEFAULT NULL,
                        `gender` varchar(5) DEFAULT NULL,
                        `is_active` bit(1) DEFAULT NULL,
                        `last_login` datetime(6) DEFAULT NULL,
                        `password` varchar(255) NOT NULL,
                        `phone_number` varchar(15) DEFAULT NULL,
                        `username` varchar(50) NOT NULL,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
                        UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'D21DCCN03-B','2024-04-22 17:18:04.000000','2024-04-18','asdf@sdf','Nguyen Quang Huy','Nam',_binary '','2024-04-22 17:18:25.000000','123123','093888556','B21DCCN435'),(2,'D21DCCN01-B','2024-04-22 17:19:05.000000','2024-04-22','asdfas@sdf','Nguyen Thi P','Nu',_binary '','2024-04-22 17:19:24.000000','123123','093888455','B21DCCN001');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22 10:31:59
