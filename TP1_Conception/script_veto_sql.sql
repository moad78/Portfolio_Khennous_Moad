-- ----------------------------------------------------------
-- Script MYSQL pour mcd 
-- ----------------------------------------------------------


-- ----------------------------
-- Table: Soins
-- ----------------------------
CREATE TABLE Soins (
  code_soin INT NOT NULL,
  type_soin VARCHAR(50) NOT NULL,
  CONSTRAINT Soins_PK PRIMARY KEY (code_soin)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: Ordre
-- ----------------------------
CREATE TABLE Ordre (
  code_ordre INT NOT NULL,
  nom_ordre VARCHAR(50) NOT NULL,
  CONSTRAINT Ordre_PK PRIMARY KEY (code_ordre)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: Pieces
-- ----------------------------
CREATE TABLE Pieces (
  code_piece INT NOT NULL,
  numero_piece INT NOT NULL,
  CONSTRAINT Pieces_PK PRIMARY KEY (code_piece)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: Familles
-- ----------------------------
CREATE TABLE Familles (
  code_famille INT NOT NULL,
  nom_famille VARCHAR(50) NOT NULL,
  code_ordre INT NOT NULL,
  CONSTRAINT Familles_PK PRIMARY KEY (code_famille),
  CONSTRAINT Familles_code_ordre_FK FOREIGN KEY (code_ordre) REFERENCES Ordre (code_ordre)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: Genres
-- ----------------------------
CREATE TABLE Genres (
  code_genre INT NOT NULL,
  nom_genre VARCHAR(50) NOT NULL,
  code_famille INT NOT NULL,
  CONSTRAINT Genres_PK PRIMARY KEY (code_genre),
  CONSTRAINT Genres_code_famille_FK FOREIGN KEY (code_famille) REFERENCES Familles (code_famille)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: Especes
-- ----------------------------
CREATE TABLE Especes (
  code_espece INT NOT NULL,
  nom_espece VARCHAR(50) NOT NULL,
  code_genre INT NOT NULL,
  CONSTRAINT Especes_PK PRIMARY KEY (code_espece),
  CONSTRAINT Especes_code_genre_FK FOREIGN KEY (code_genre) REFERENCES Genres (code_genre)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: Bassins
-- ----------------------------
CREATE TABLE Bassins (
  code_bassin INT NOT NULL,
  numero_bassin INT NOT NULL,
  code_piece INT NOT NULL,
  CONSTRAINT Bassins_PK PRIMARY KEY (code_bassin)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: Animaux
-- ----------------------------
CREATE TABLE Animaux (
  code_animal INT NOT NULL,
  date_naissance DATE NOT NULL,
  date_achat DATE NOT NULL,
  code_espece INT NOT NULL,
  CONSTRAINT Animaux_PK PRIMARY KEY (code_animal)
)ENGINE=InnoDB;


-- ----------------------------
-- Table: loge...
-- ----------------------------
CREATE TABLE loge... (
  code_bassin INT NOT NULL,
  code_animal INT NOT NULL,

/******************************************************************************************************
*                                                                                                     *
*      -->    Désolé, il faut activer cette version pour voir la suite du script !                    *
*                                                                                                     *
*******************************************************************************************************/