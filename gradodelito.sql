-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2025 at 03:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbinterpolice2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `gradodelito`
--
CREATE DATABASE dbinterpolice2025;
USE dbinterpolice2025;
CREATE TABLE `gradodelito` (
  `idGradoDelito` int(11) NOT NULL,
  `grado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `gradodelito`
--

INSERT INTO `gradodelito` (`idGradoDelito`, `grado`) VALUES
(1, 'Grado 1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gradodelito`
--
ALTER TABLE `gradodelito`
  ADD PRIMARY KEY (`idGradoDelito`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gradodelito`
--
ALTER TABLE `gradodelito`
  MODIFY `idGradoDelito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
