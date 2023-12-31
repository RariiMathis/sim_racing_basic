"""empty message

Revision ID: 73b302ad0772
Revises: 27ca46e64a1f
Create Date: 2023-12-13 11:40:54.954702

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '73b302ad0772'
down_revision = '27ca46e64a1f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedals', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.DECIMAL(precision=10, scale=2),
               type_=sa.Float(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedals', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.Float(),
               type_=sa.DECIMAL(precision=10, scale=2),
               existing_nullable=False)

    # ### end Alembic commands ###
