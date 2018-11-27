-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2018 at 07:49 PM
-- Server version: 10.3.9-MariaDB-1:10.3.9+maria~stretch
-- PHP Version: 7.0.31-1+0~20180910100529.3+stretch~1.gbp90e89d

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wolffia`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `structure` mediumtext NOT NULL,
  `template` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`id`, `name`, `structure`, `template`) VALUES
(1, 'blog', '{\"posts\":{\"type\":\"repeating\",\"structure\":{\"title\":{\"type\":\"text\"},\"content\":{\"type\":\"html\"},\"posts\":{\"type\":\"repeating\",\"structure\":{\"title\":{\"type\":\"text\"},\"content\":{\"type\":\"html\"}}}}}}', '/blocks/blog.ejs'),
(2, 'heading', '', '/blocks/heading.ejs');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `template` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `name`, `template`) VALUES
(1, 'Homepage', 'home', './pages/home.ejs'),
(2, 'about', 'about', './pages/about.ejs');

-- --------------------------------------------------------

--
-- Table structure for table `page_data`
--

CREATE TABLE `page_data` (
  `id` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `data` mediumtext NOT NULL,
  `block` int(11) NOT NULL,
  `display` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `page_data`
--

INSERT INTO `page_data` (`id`, `page`, `name`, `data`, `block`, `display`) VALUES
(1, 1, 'blog', '{\"posts\":{\"type\":\"repeating\",\"value\":[{\"title\":{\"type\":\"text\",\"value\":\"SO MUICH dooting faster\"},\"content\":{\"type\":\"html\",\"value\":\"<strong>TOTORO</strong>\"},\"posts\":{\"value\":[{\"title\":{\"type\":\"text\",\"value\":\"SO MUICH dooting faster\"},\"content\":{\"type\":\"html\",\"value\":\"<strong>TOTORO</strong>\"}},{\"title\":{\"type\":\"text\",\"value\":\"TEST header\"},\"content\":{\"type\":\"html\",\"value\":\"<strong>TEST</strong>\"}}],\"type\":\"repeating\"}}]}}', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_data`
--
ALTER TABLE `page_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `page_data`
--
ALTER TABLE `page_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
