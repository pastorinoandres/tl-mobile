import React from "react";
import { TextInput, Image, TouchableOpacity } from "react-native";
import { Text, Line, Group } from "../atoms";
import { InputLabel as Label, InputError as Error } from "../molecules";
import { colors, typography, ui, calculateSize } from "../../styles";
import { DownArrow } from "../../vectors";
import Explorer from "./Explorer";
import { useToogle } from "./../../../hooks";
import { images } from "./../../../utils/images";

const NumberInput = (props) => {
  //Destructuración de props
  const { name, placeholder, type, keyboardType } = props;
  const { values, handleChange, setFieldTouched, autoFocus } = props.formik;
  const { toogleFocus } = props;

  const isPlaceholder = !values[name];

  const textInputStyles = isPlaceholder
    ? {
        ...typography["body-18"].typography,
        height: calculateSize(40),
        flex: 1,
        color: colors.grey.t80,
      }
    : {
        ...typography["body-18"].typography,
        height: calculateSize(40),
        flex: 1,
        color: colors.grey.t80,
        letterSpacing: calculateSize(2),
      };

  return (
    <TextInput
      style={textInputStyles}
      placeholder={placeholder}
      placeholderTextColor={colors.grey.t40}
      keyboardType={keyboardType}
      value={values[name]}
      onBlur={() => {
        setFieldTouched(name);
        toogleFocus();
      }}
      onChangeText={(e) => {
        handleChange(name)(e);
      }}
      onFocus={toogleFocus}
      autoCompleteType={type}
      autoFocus={autoFocus}
    />
  );
};

const CountryPicker = ({
  currentCountry,
  items,
  handleChange,
  setFieldTouched,
}) => {
  const flagDefault = images.flagDefault;
  const { code, area } = currentCountry;
  const size = 32;
  const source = {
    uri: `https://www.countryflags.io/${code}/flat/${size}.png`,
  };

  //Estado interno
  const [menu, toogleMenu] = useToogle(false);

  //Preparo el listado de paises que quiero mostrar en el listado y los formateo según corresponda

  const onPressCountry = (country) => {
    handleChange("country")({
      area: `+${country.phone_code}`,
      code: country.iso2,
    });
    setFieldTouched("country");
  };

  const list = items.map((country) => {
    return {
      title: `${country.nombre} +${country.phone_code}`,
      image: `https://www.countryflags.io/${country.iso2}/flat/24.png`,
      onPress: () => {
        onPressCountry(country);
      },
    };
  });

  //Estilo
  const styles = {
    touchable: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: calculateSize(40),
      paddingLeft: calculateSize(5),
    },
    image: {
      height: size,
      width: size,
    },
  };

  const explorerProps = {
    menu,
    toogleMenu,
    list,
    title: "Selecciona tu pais",
  };

  return (
    <TouchableOpacity style={styles.touchable} onPress={toogleMenu}>
      <Image style={styles.image} source={source} defaultSource={flagDefault} />
      <Text
        {...typography["body-18"]}
        color={colors.grey.t80}
        extraStyles={{ marginHorizontal: 5, textAlign: "left" }}
      >
        {area}
      </Text>
      <DownArrow size={15} />
      <Explorer {...explorerProps} />
    </TouchableOpacity>
  );
};

const PhoneInput = (props) => {
  //Destructuración de props
  const { label, items } = props;
  const { values, handleChange, setFieldTouched } = props.formik;

  //Estado interno
  const [focus, toogleFocus] = useToogle(false);
  const focusProps = { focus, toogleFocus };

  const getError = () => {
    const numbers = values["phone"] ? values["phone"].length : 0; //Cantidad de numeros escritos
    const required = 10 - numbers; // Cantidad de números faltantes para cumplir con el formato de telefono
    const error = required && required < 10 && required > 0;
    const message = `${required === 1 ? "Falta un" : `Faltan ${required}`} ${
      required === 1 ? "digito" : "digitos"
    }. Tene en cuenta la caracteristica de tu localidad`;

    return error && message;
  };

  const error = getError();

  //Lógica de estilos
  const thickness = focus ? 2 : 1;

  let color = colors.grey.t40;

  if (focus) {
    color = colors.acento.primary;
  }

  if (error) {
    color = colors.error.primary;
  }

  //Estilos
  const styles = {
    container: {
      marginVertical: ui.margin,
      zIndex: 10,
    },
    input: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: calculateSize(2),
    },
    line: {
      color,
      thickness,
    },
  };

  //Facilito el ingreso de las props al CountryPicker
  const countryPickerProps = {
    currentCountry: values["country"],
    items,
    handleChange,
    setFieldTouched,
  };

  return (
    <Group style={styles.container}>
      <Label text={label} />

      <Group style={styles.input}>
        <CountryPicker {...countryPickerProps} />

        <Line
          direction="vertical"
          thickness={calculateSize(0.5)}
          height={calculateSize(32)}
          color={colors.grey.t40}
          marginHorizontal={calculateSize(10)}
        />

        <NumberInput {...props} {...focusProps} />
      </Group>

      <Line {...styles.line} />

      <Error error={error} touched={true} />
    </Group>
  );
};

export default PhoneInput;
