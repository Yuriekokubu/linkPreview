-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 19, 2021 at 10:25 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `link_preview`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_img`
--

CREATE TABLE `tb_img` (
  `img_id` int(11) NOT NULL,
  `img_path` varchar(60) NOT NULL,
  `web_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `name`, `username`, `password`) VALUES
(1, 'ativat', 'ativat', '123456'),
(2, 'aitvat', 'ativat', '$2b$10$OFEsI9tkZ7Kbj0CT4Rg1lOih.ANlUEqSbamTDiI5J6rzlhcTo4f/y'),
(3, 'aitvat', 'ativat', '$2b$10$riDAmtMejlLaLoXcI18iN.wA.joxrxWIXDSpmZCEiLmBqXRV90s/C'),
(4, 'aitvat', 'ativat', '$2b$10$t31XCd4DszL7ickwE4ljBe16DZ3wfvJML3tVnDw2wVMBp6DcuOp3i'),
(5, 'tae', 'youtuber', '$2b$10$Q45U3AnmkeycXv4aMZRjhezwiiQLP1f2XkdsZVZ4qqkTgZqtEQ0yu');

-- --------------------------------------------------------

--
-- Table structure for table `tb_web`
--

CREATE TABLE `tb_web` (
  `web_id` int(11) NOT NULL,
  `web_name` varchar(100) NOT NULL,
  `web_url` varchar(500) DEFAULT NULL,
  `web_details` varchar(500) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_zip`
--

CREATE TABLE `tb_zip` (
  `zip_id` int(11) NOT NULL,
  `zip_path` varchar(100) DEFAULT NULL,
  `web_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_img`
--
ALTER TABLE `tb_img`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_web`
--
ALTER TABLE `tb_web`
  ADD PRIMARY KEY (`web_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tb_zip`
--
ALTER TABLE `tb_zip`
  ADD PRIMARY KEY (`zip_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_img`
--
ALTER TABLE `tb_img`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1633;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_web`
--
ALTER TABLE `tb_web`
  MODIFY `web_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `tb_zip`
--
ALTER TABLE `tb_zip`
  MODIFY `zip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_web`
--
ALTER TABLE `tb_web`
  ADD CONSTRAINT `tb_web_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
