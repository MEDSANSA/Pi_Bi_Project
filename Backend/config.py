#DB_USER = "MEDSANSA\azizs"
#DB_PASSWORD = "211222"

DB_SERVER = "localhost"
DB_PORT = "3306"
DB_NAME = "sap"
DB_USER = "postgres"
DB_PASSWORD = "root"

#DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}:{DB_PORT}/{DB_NAME}"
#DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}:{DB_PORT}/{DB_NAME}"
#DATABASE_URL = "postgresql://postgres:root@localhost/sap"

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}/{DB_NAME}"