defmodule Brig.ProfessionalsTest do
  use Brig.DataCase

  alias Brig.Professionals

  describe "professionals" do
    alias Brig.Professionals.Professional

    @valid_attrs %{age: 42, description: "some description", gender: "some gender", is_religious: true, is_spiritual: true, latitude: "120.5", longitude: "120.5", name: "some name", political_alignment: "some political_alignment", rate: 42, services: [], specialties: []}
    @update_attrs %{age: 43, description: "some updated description", gender: "some updated gender", is_religious: false, is_spiritual: false, latitude: "456.7", longitude: "456.7", name: "some updated name", political_alignment: "some updated political_alignment", rate: 43, services: [], specialties: []}
    @invalid_attrs %{age: nil, description: nil, gender: nil, is_religious: nil, is_spiritual: nil, latitude: nil, longitude: nil, name: nil, political_alignment: nil, rate: nil, services: nil, specialties: nil}

    def professional_fixture(attrs \\ %{}) do
      {:ok, professional} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Professionals.create_professional()

      professional
    end

    test "list_professionals/0 returns all professionals" do
      professional = professional_fixture()
      assert Professionals.list_professionals() == [professional]
    end

    test "get_professional!/1 returns the professional with given id" do
      professional = professional_fixture()
      assert Professionals.get_professional!(professional.id) == professional
    end

    test "create_professional/1 with valid data creates a professional" do
      assert {:ok, %Professional{} = professional} = Professionals.create_professional(@valid_attrs)
      assert professional.age == 42
      assert professional.description == "some description"
      assert professional.gender == "some gender"
      assert professional.is_religious == true
      assert professional.is_spiritual == true
      assert professional.latitude == Decimal.new("120.5")
      assert professional.longitude == Decimal.new("120.5")
      assert professional.name == "some name"
      assert professional.political_alignment == "some political_alignment"
      assert professional.rate == 42
      assert professional.services == []
      assert professional.specialties == []
    end

    test "create_professional/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Professionals.create_professional(@invalid_attrs)
    end

    test "update_professional/2 with valid data updates the professional" do
      professional = professional_fixture()
      assert {:ok, %Professional{} = professional} = Professionals.update_professional(professional, @update_attrs)
      assert professional.age == 43
      assert professional.description == "some updated description"
      assert professional.gender == "some updated gender"
      assert professional.is_religious == false
      assert professional.is_spiritual == false
      assert professional.latitude == Decimal.new("456.7")
      assert professional.longitude == Decimal.new("456.7")
      assert professional.name == "some updated name"
      assert professional.political_alignment == "some updated political_alignment"
      assert professional.rate == 43
      assert professional.services == []
      assert professional.specialties == []
    end

    test "update_professional/2 with invalid data returns error changeset" do
      professional = professional_fixture()
      assert {:error, %Ecto.Changeset{}} = Professionals.update_professional(professional, @invalid_attrs)
      assert professional == Professionals.get_professional!(professional.id)
    end

    test "delete_professional/1 deletes the professional" do
      professional = professional_fixture()
      assert {:ok, %Professional{}} = Professionals.delete_professional(professional)
      assert_raise Ecto.NoResultsError, fn -> Professionals.get_professional!(professional.id) end
    end

    test "change_professional/1 returns a professional changeset" do
      professional = professional_fixture()
      assert %Ecto.Changeset{} = Professionals.change_professional(professional)
    end
  end
end
