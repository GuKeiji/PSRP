USE DBProcessoSeletivo2RP;
GO

INSERT INTO TIPOUSUARIO(tipo)
VALUES ('Geral'),('Admin'),('Root');
GO

INSERT INTO USUARIO(IdTipoUsuario, nome, email, senha, situacao)
VALUES (1,'Gustavo','gustavo123@gmail.com','gu123',1),(2,'Ronaldo','ronaldo123@gmail.com','ronaldo123',1),(3,'Renan','renan123@gmail.com','renan123',1);
GO

