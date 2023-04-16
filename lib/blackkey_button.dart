import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hitchhiker/blackkey.dart';
import 'package:url_launcher/url_launcher_string.dart';

import 'display.dart';

class BlackKeyButton extends ConsumerWidget {
  const BlackKeyButton(this.alphabet, {super.key});

  final String alphabet;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () async {
          var state = ref.read(displayProvider.notifier).state;
          state += alphabet;
          if (state == 'pizza') {
            await launchUrlString('https://oyasumi.space/invite/EFktq6Up');
          }
          if (state.length <= 10) {
            ref.read(displayProvider.notifier).state = state;
          }
        },
        child: SizedBox(
          width: 36,
          height: 36,
          child: BlackKey(alphabet),
        ),
      ),
    );
  }
}
