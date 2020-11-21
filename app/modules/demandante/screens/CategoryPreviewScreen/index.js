import React from "react";
import { View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, typography } from "../../../../shared/styles";
import categoriasStyles from "./styles";
import { Text } from "./../../../../shared/components/atoms";
import users from "../../../../mocks/users";
import CategoryPreviewCard from "./CategoryPreviewCard";

const CategoryPreviewScreen = (props) => {
  const { image, title, subtitle } = props.route.params;

  const recomendados = users.filter((user) => user.skill === title);

  const ListaRecomendados = ({ lista }) => {
    return lista.map((recomendado) => {
      const contact = {
        name: recomendado.name,
        skill: recomendado.skill,
        photo: recomendado.image,
        state: recomendado.state,
        aboutMe: recomendado.aboutMe,
        city: recomendado.city,
        qualification: recomendado.reputation,
        distance: recomendado.distance,
      };
      return <CategoryPreviewCard contact={contact} />;
    });
  };

  return (
    <View style={categoriasStyles.container}>
      <ScrollView style={categoriasStyles.scrollView}>
        <Image source={image} style={categoriasStyles.catImag} />
        <LinearGradient
          style={categoriasStyles.degradado}
          {...colors.greyGradient}
        />
        <Text
          {...typography["title-28"]}
          extraStyles={categoriasStyles.catTitle}
        >
          {" "}
          {`${title}`}{" "}
        </Text>

        <View style={categoriasStyles.mainContainer}>
          <Text
            {...typography["title-20"]}
            extraStyles={categoriasStyles.catText}
          >
            {recomendados.length
              ? "Personal Sugerido"
              : "No hay trabajadores para categoría"}{" "}
          </Text>

          <ListaRecomendados lista={recomendados} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryPreviewScreen;
