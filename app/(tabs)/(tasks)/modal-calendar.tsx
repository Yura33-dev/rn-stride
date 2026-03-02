import Colors from '@/constants/Colors';
import { useWeekStore } from '@/store';
import { getMarkedDates } from '@/utilities';
import { addMonths, eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { useNavigation } from 'expo-router';
import { useMemo } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

export default function CalendarModalScreen() {
  const { selectedWeek, setSelectedWeek } = useWeekStore();

  const markedDates = useMemo(() => {
    return getMarkedDates(selectedWeek);
  }, [selectedWeek]);

  const router = useNavigation();

  const SCREEN_WIDTH = Dimensions.get('window').width;

  const handleDayPress = (day: DateData) => {
    const selected = new Date(day.year, day.month - 1, day.day);

    const start = startOfWeek(selected, { weekStartsOn: 1 }); //from Monday
    const end = endOfWeek(selected, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    setSelectedWeek({ start, end, days });
    router.goBack();
  };

  const months = Array.from({ length: 24 }, (_, i) =>
    format(addMonths(new Date(), i - 12), 'yyyy-MM-dd'),
  );

  return (
    <FlatList
      data={months}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={12}
      initialNumToRender={1}
      windowSize={3}
      maxToRenderPerBatch={1}
      getItemLayout={(_, index) => ({
        length: SCREEN_WIDTH,
        offset: SCREEN_WIDTH * index,
        index,
      })}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={{ width: SCREEN_WIDTH }}>
          <Calendar
            current={item}
            markingType="period"
            markedDates={markedDates}
            onDayPress={handleDayPress}
            hideArrows={true}
            firstDay={1}
            style={{ borderRadius: 6, marginHorizontal: 16, height: 370 }}
            theme={{
              arrowColor: Colors.foreground,

              calendarBackground: '#0B2D8A',
              monthTextColor: Colors.foreground,
              textMonthFontSize: 20,
              textMonthFontWeight: '700',

              textDisabledColor: Colors.secondary,
              dayTextColor: Colors.foreground,

              todayTextColor: Colors.foreground,
              todayBackgroundColor: Colors.background[600],
            }}
          />
        </View>
      )}
    />
  );
}
