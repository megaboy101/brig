defmodule Brig.Repo.Migrations.CreateProfessionals do
  use Ecto.Migration

  def change do
    create table(:professionals) do
      add :name, :string
      add :age, :integer
      add :rate, :integer
      add :latitude, :decimal
      add :longitude, :decimal
      add :description, :string
      add :specialties, {:array, :string}
      add :services, {:array, :string}
      add :gender, :string
      add :is_religious, :boolean, default: false, null: false
      add :is_spiritual, :boolean, default: false, null: false
      add :political_alignment, :string

      timestamps()
    end

  end
end
