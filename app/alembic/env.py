from alembic import context
from sqlalchemy import engine_from_config, pool
from logging.config import fileConfig
from db.models import Base  # Importe seus modelos aqui

# Configurações de logging
fileConfig(context.config.config_file_name)

# Define o target_metadata a partir dos seus modelos
target_metadata = Base.metadata

def run_migrations_offline():
    """Executa as migrações no modo offline."""
    url = context.config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url, target_metadata=target_metadata, literal_binds=True
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Executa as migrações no modo online."""
    connectable = engine_from_config(
        context.config.get_section(context.config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()

# Escolha entre offline ou online conforme o contexto
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
